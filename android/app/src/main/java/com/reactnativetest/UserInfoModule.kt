package com.reactnativetest

import android.database.Cursor
import android.net.Uri
import android.util.Log
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class UserInfoModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    private val TAG = "UserInfoModule"

    override fun getName(): String {
        return "UserInfoModule"
    }

    @ReactMethod
    fun getData(userPool: String,accessToken: String, idToken: String, refreshToken: String) {
        Log.d(TAG, "userPool: ${userPool}")
        Log.d(TAG, "accessToken: ${accessToken}")
        Log.d(TAG, "idToken: ${idToken}")
        Log.d(TAG, "refreshToken: ${refreshToken}")
    }

    @ReactMethod
    fun saveData(userPool: String,accessToken: String, idToken: String, refreshToken: String) {
        Log.d(TAG, "userPool: ${userPool}")
        Log.d(TAG, "accessToken: ${accessToken}")
        Log.d(TAG, "idToken: ${idToken}")
        Log.d(TAG, "refreshToken: ${refreshToken}")
    }

    @ReactMethod
    fun getProviderData(callBack: Callback) {
        var idToken = ""
        var accessToken = ""
        var refreshToken = ""
        Log.d(TAG, "onCreate: getProviderData")

        var CONTENT_URI = Uri.parse("content://com.demo.user.provider/users")

        // creating a cursor object of the
        // content URI
        val cursor = reactApplicationContext.contentResolver.query(Uri.parse(
            "content://com.demo.user.provider/users"),
            null,
            null,
            null,
            null)

        // iteration of the cursor
        // to print whole table
        if (cursor!!.moveToFirst()) {
            while (!cursor.isAfterLast) {
                idToken = cursor.getString(cursor.getColumnIndex("idToken"))
                accessToken = cursor.getString(cursor.getColumnIndex("accessToken"))
                refreshToken = cursor.getString(cursor.getColumnIndex("refreshToken"))
                Log.d(TAG, "fetchData: ${cursor.getString(cursor.getColumnIndex("accessToken"))} ")
                Log.d(TAG, "fetchData: ${cursor.getString(cursor.getColumnIndex("idToken"))} ")
                Log.d(TAG, "fetchData: ${cursor.getString(cursor.getColumnIndex("refreshToken"))} ")
                cursor.moveToNext()
            }

            callBack.invoke(idToken, refreshToken, accessToken)
        } else {
            Log.d(TAG, "getProviderData: no record found!")
        }
    }
}