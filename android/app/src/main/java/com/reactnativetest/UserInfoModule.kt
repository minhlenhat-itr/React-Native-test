package com.reactnativetest

import android.annotation.SuppressLint
import android.content.ContentProvider
import android.content.pm.PackageManager
import android.content.pm.ProviderInfo
import android.database.Cursor
import android.net.Uri
import android.util.Log
import android.webkit.URLUtil
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.content.ComponentName
import com.reactnativetest.contentprovider.MyContentProvider


class UserInfoModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    private val TAG = "UserInfoModule"

    override fun getName(): String {
        return "UserInfoModule"
    }

    private val listParticipantProvider = arrayListOf(
        "com.demo.user.provider",
        "com.reactnativetest.provider",
    )

    var activeContentProvider = ""

    @ReactMethod
    fun deleteData(callBack: Callback) {
        Log.d(TAG, "delete native ${BuildConfig.APPLICATION_ID}")
//        var CONTENT_URI = Uri.parse("content://com.demo.user.provider/users")
        try {
            var CONTENT_URI = Uri.parse(activeContentProvider)
            var applicationId = BuildConfig.APPLICATION_ID
            val dataResult = reactApplicationContext.contentResolver.delete(CONTENT_URI, "applicationId=?",
                arrayOf(applicationId)
            )
            Log.d(TAG, "delete $dataResult ")
            if (dataResult == 0) {
                Log.d(TAG, "Error: ${BuildConfig.APPLICATION_ID} does not match!!")
                callBack.invoke(false, "ApplicationId not exist!!")
            } else {
                Log.d(TAG, "delete $applicationId successful!! ")
                callBack.invoke(true, "Delete data successful!!")
            }
        }catch (exception: Exception){
            Log.d(TAG, "error delete: ${exception.message}")
            callBack.invoke(false, exception.message)
        }

    }

    @SuppressLint("Range")
    @ReactMethod
    fun getProviderData(callBack: Callback) {
        //Find Exist Content Provider:
        if(checkIfContentProviderExist()) {
            var idToken = ""
            var accessToken = ""
            var refreshToken = ""

            var CONTENT_URI = Uri.parse(activeContentProvider)

            // creating a cursor object of the
            // content URI
            val cursor: Cursor? = reactApplicationContext.contentResolver.query(CONTENT_URI,
                null,
                null,
                null,
                null
            )

            Log.d(TAG, "getProviderData: cursor.count: ${cursor?.count}")
            when (cursor?.count) {
                null -> {
                    /*
                     * Insert code here to handle the error. Be sure not to use the cursor!
                     * You may want to call android.util.Log.e() to log this error.
                     *
                     */
                    Log.d(TAG, "Error query data!")
                    callBack.invoke(false, "Error query data! ")
                }
                0 -> {
                    /*
                     * Insert code here to notify the user that the search was unsuccessful. This isn't
                     * necessarily an error. You may want to offer the user the option to insert a new
                     * row, or re-type the search term.
                     */
                    Log.d(TAG, "fetchData: no record found! ")
                    callBack.invoke(false, "no record found! ")

                }
                else -> {
                    // Insert code here to do something with the results
                    if (cursor!!.moveToFirst()) {
                        while (!cursor.isAfterLast) {
                            idToken = cursor.getString(cursor.getColumnIndex("idToken"))
                            accessToken = cursor.getString(cursor.getColumnIndex("accessToken"))
                            refreshToken = cursor.getString(cursor.getColumnIndex("refreshToken"))
                            Log.d(TAG, "accessToken: $accessToken ")
                            Log.d(TAG, "idToken: $idToken ")
                            Log.d(TAG, "refreshToken: $refreshToken ")
                            cursor.moveToNext()
                        }
                        callBack.invoke(true, "fetch data successful!", idToken, refreshToken, accessToken)
                    }else {
                        Log.d(TAG, "fetchData: no record found!")
                    }
                }
            }
        }else {
            // content provider doesn't exist
            callBack(false, "Content provider doesn't exist!!!")
        }
    }

    @ReactMethod
    fun checkFirstTimeCreateContentProvider(callBack: Callback) {

        if (checkIfContentProviderExist()) {
            // content provider exist
            Log.d(TAG, "getList: contentProvider exist!!!")
            callBack.invoke(true, "Authority: ${activeContentProvider} is running...")
        } else {
            // content provider doesn't exist - should be created
            Log.d(TAG, "getList: contentProvider null!!!")
            val compName = ComponentName(
                reactApplicationContext,
                MyContentProvider::class.java
            )
            reactApplicationContext.packageManager.setComponentEnabledSetting(
                compName,
                PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                PackageManager.DONT_KILL_APP);

            callBack.invoke(false, "Content provider doesn't exist, " +
                    "create new with Authority: ${BuildConfig.APPLICATION_ID}")
        }
    }

    private fun checkIfContentProviderExist(): Boolean {
        var providerInfo: ProviderInfo?
        for (pack in reactApplicationContext.packageManager
            .getInstalledPackages(PackageManager.GET_PROVIDERS)) {
            val providers = pack.providers
            if (providers != null) {
//                for (provider in providers) {
//                    Log.d("Example", "provider: " + provider.authority)
//                }
                for (partnerUri in listParticipantProvider) {
                    try {
                        providerInfo = providers
                            .first { providerInfo: ProviderInfo? ->
                                providerInfo?.authority?.endsWith(partnerUri) == true
                            }
                        if(providerInfo != null) {
                            Log.d(TAG, "getList: content://${providerInfo.authority}/users")
                            activeContentProvider = "content://${providerInfo.authority}/users"
                            return true
                        }
                    }catch (exception: Exception) {
//                    Log.d(TAG, "error: ${exception.message}")
                    }
                }
            }
        }
//        Log.d(TAG, "getList: Result: ${providerInfo != null}")
        return false
    }

}