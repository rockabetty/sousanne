import { PoolClient, QueryResult } from 'pg';
import PoolConnection from './connection.ts';
import {QueryFunction} from './types/queryhelpers';

export async function queryDbConnection(queryFunction: QueryFunction): Promise<QueryResult | Error> {
    const pool = PoolConnection.get();
    const client = await pool.connect();

    try {
        return await queryFunction(client);
    } catch (err) {
        console.error('Database error:', err);
        return new Error('Database operation failed');
    } finally {
        client.release();
    }
}