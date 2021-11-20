import { createConnection, Connection } from 'typeorm';
import connectionOptions from '@database/ormConfig';
import { ENVIRONMENT } from '../config/secret';

export class DBConnection {
    public static conn: Connection;

    public static async databaseConnection(): Promise<void> {
        return createConnection(connectionOptions)
            .then((connection) => {
                this.conn = connection;
                if (ENVIRONMENT === 'test') {
                    this.conn.runMigrations();
                }
                console.info('Connected to DB');
            })
            .catch((error) => {
                console.error('Not Connected to DB');
                console.error(error);
            });
    }

    public static closeConnection(): Promise<void> {
        return this.conn.close();
    }
}
