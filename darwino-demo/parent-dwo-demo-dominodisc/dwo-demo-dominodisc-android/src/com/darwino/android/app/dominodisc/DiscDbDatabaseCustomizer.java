/*!COPYRIGHT HEADER! - CONFIDENTIAL 
 *
 * Darwino Inc Confidential.
 *
 * (c) Copyright Darwino Inc 2014-2015.
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.     
 */

package com.darwino.android.app.dominodisc;

import java.util.List;

import com.darwino.commons.json.JsonException;
import com.darwino.commons.util.StringUtil;
import com.darwino.jsonstore.sql.DBSchema;
import com.darwino.jsonstore.sql.SqlUtils;
import com.darwino.jsonstore.sql.impl.sqlite.SqliteDatabaseCustomizer;



/**
 * Database customizer.
 */
public class DiscDbDatabaseCustomizer extends SqliteDatabaseCustomizer {
	
	public static final int VERSION = 2;
	
	public DiscDbDatabaseCustomizer() {
	}
	
	@Override
	public int getVersion(String databaseName) {
		// 1-
		//		- Added an index to the sort by cdate desc
		// 2-
		//		- Made the index non null first for all the drivers
		return VERSION ;
	}

	@Override
	public void getAlterStatements(List<String> statements, String schema, String databaseName, int existingVersion) throws JsonException {
		if(existingVersion==VERSION) {
			// Ok, we are good!
			return;
		}
		
		statements.add(StringUtil.format(
			"CREATE INDEX {0} ON {1} ({2},{3},{4} DESC,{5} ASC)",
				getCustomIndexName(schema, databaseName, SqlUtils.SUFFIX_DOCUMENT, 2),
				SqlUtils.sqlTableName(schema,databaseName,SqlUtils.SUFFIX_DOCUMENT),
				DBSchema.FDOC_INSTID,
				DBSchema.FDOC_STOREID,
				DBSchema.FDOC_CDATE,
				DBSchema.FDOC_UNID
			)
		);
	}
}