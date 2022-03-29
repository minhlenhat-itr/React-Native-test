package com.reactnativetest.contentprovider

import android.content.*
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteException
import android.database.sqlite.SQLiteOpenHelper
import android.database.sqlite.SQLiteQueryBuilder
import android.net.Uri
import android.util.Log

data class UserInfo(val userPool: String,
                    val accessToken: String,
                    val idToken: String,
                    val refreshToken: String)

class MyContentProvider: ContentProvider() {
    private val TAG = "MyContentProvider"

    companion object {
        // defining authority so that other application can access it
        const val PROVIDER_NAME = "com.demo.user.provider"

        // defining content URI
        const val URL = "content://$PROVIDER_NAME/users"

        // parsing the content URI
        val CONTENT_URI = Uri.parse(URL)
        const val id = "id"
        const val name = "name"
        const val userPoolId = "userPoolId"
        const val idToken = "idToken"
        const val accessToken = "accessToken"
        const val refreshToken = "refreshToken"
        const val uriCode = 1
        var uriMatcher: UriMatcher? = null
        private val values: HashMap<String, String>? = null

        // declaring name of the database
        const val DATABASE_NAME = "UserDB"

        // declaring table name of the database
        const val TABLE_NAME = "Users"

        // declaring version of the database
        const val DATABASE_VERSION = 2

        // sql query to create the table
        const val CREATE_DB_TABLE =
            (" CREATE TABLE " + TABLE_NAME
                    + " (id INTEGER PRIMARY KEY AUTOINCREMENT,"
                    + name + " TEXT NOT NULL,"
                    + idToken + " TEXT)")

        init {

            // to match the content URI
            // every time user access table under content provider
            uriMatcher = UriMatcher(UriMatcher.NO_MATCH)

            // to access whole table
            uriMatcher!!.addURI(
                PROVIDER_NAME,
                "users",
                uriCode
            )

            // to access a particular row
            // of the table
            uriMatcher!!.addURI(
                PROVIDER_NAME,
                "users/*",
                uriCode
            )
        }
    }

    override fun onCreate(): Boolean {
        val context = context
        val dbHelper =
            DatabaseHelper(context)
        db = dbHelper.writableDatabase
        return db != null
    }

    override fun query(
        uri: Uri,
        projection: Array<out String>?,
        selection: String?,
        selectionArgs: Array<out String>?,
        sortOrder: String?
    ): Cursor? {
        var sortOrder = sortOrder
        val qb = SQLiteQueryBuilder()
        qb.tables = TABLE_NAME
        when (uriMatcher!!.match(uri)) {
            uriCode -> qb.projectionMap = values
            else -> throw IllegalArgumentException("Unknown URI $uri")
        }
        if (sortOrder == null || sortOrder === "") {
            sortOrder = id
        }
        val c = qb.query(
            db, projection, selection, selectionArgs, null,
            null, sortOrder
        )
        c.setNotificationUri(context!!.contentResolver, uri)
        return c
    }

    override fun getType(uri: Uri): String? {
        return when (uriMatcher!!.match(uri)) {
            uriCode -> "vnd.android.cursor.dir/users"
//            uriCode -> "vnd.android.cursor.item/users"
            else -> throw IllegalArgumentException("Unsupported URI: $uri")
        }
    }

    override fun insert(uri: Uri, values: ContentValues?): Uri? {
        Log.d(TAG, "insert: values ${values.toString()}")
        val rowID = db!!.insert(TABLE_NAME, "", values)
        Log.d(TAG, "insert: $rowID")
        if (rowID > 0) {
            val _uri =
                ContentUris.withAppendedId(CONTENT_URI, rowID)
            context!!.contentResolver.notifyChange(_uri, null)
            return _uri
        }
        throw SQLiteException("Failed to add a record into $uri")
    }

    override fun delete(uri: Uri, selection: String?, selectionArgs: Array<out String>?): Int {
        var count = 0
        count = when (uriMatcher!!.match(uri)) {
            uriCode -> db!!.delete(TABLE_NAME, selection, selectionArgs)
            else -> throw IllegalArgumentException("Unknown URI $uri")
        }
        context!!.contentResolver.notifyChange(uri, null)
        return count
    }

    override fun update(
        uri: Uri,
        values: ContentValues?,
        selection: String?,
        selectionArgs: Array<out String>?
    ): Int {
        var count = 0
        count = when (uriMatcher!!.match(uri)) {
            uriCode -> db!!.update(TABLE_NAME, values, selection, selectionArgs)
            else -> throw IllegalArgumentException("Unknown URI $uri")
        }
        context!!.contentResolver.notifyChange(uri, null)
        return count
    }

    // creating object of database
    // to perform query
    private var db: SQLiteDatabase? = null

    private class DatabaseHelper  // defining a constructor


    internal constructor(context: Context?) : SQLiteOpenHelper(
        context,
        DATABASE_NAME,
        null,
        DATABASE_VERSION
    ) {
        // creating a table in the database
        override fun onCreate(db: SQLiteDatabase) {
            db.execSQL(CREATE_DB_TABLE)
        }

        private val TAG = "DataBaseHelpder"

        override fun onUpgrade(
            db: SQLiteDatabase,
            oldVersion: Int,
            newVersion: Int
        ) {

            // sql query to drop a table
            // having similar name
            Log.d(TAG, "onUpgrade: oldVersion: ${oldVersion} : ${newVersion}")
            if (oldVersion != newVersion) {
                // Simplest implementation is to drop all old tables and recreate them
                db.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME);
                onCreate(db);
            }
//            db.execSQL("DROP TABLE IF EXISTS $TABLE_NAME")
//            onCreate(db)
        }
    }
}