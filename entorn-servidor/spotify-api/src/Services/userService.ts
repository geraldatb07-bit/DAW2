import { randomUUID } from "crypto";
import { isValidUser } from "../validators/user.validator";
import type { User } from "../interfaces/User/user";
import type { UserBD } from "../interfaces/User/userBD";
import type { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import type { errorService, errorService as ErrorService } from "../interfaces/error/errorService";
import type { successService as SuccessService } from "../interfaces/error/SuccessService";
import type { createSuccessService } from "../interfaces/error/createSuccessService";
import { ConnectionPool, IResult, UniqueIdentifier } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";


export async function getAllUsers(): Promise<UserBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from [User]`;
    const result: IResult<UserBD> = await request.query(queryText);
    return result.recordset;
}

export async function getUserById(idUser: string): Promise<selectSuccessService<UserBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from [User] as U Where U.id = @id`;
    request.input("id", UniqueIdentifier, idUser);

    const result: IResult<UserBD> = await request.query(queryText);

    if (result.recordset[0]) {
        return {
            success: false,
            code: 404,
            message: "User not found"
        }
    }
    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    }
}

export async function createUser(user: User): Promise<SuccessService<number> | ErrorService> {
    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data." };
    }
    const email: string = user.email.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO USER(user_id,email,country)
        VALUES(@user_id,@email,@country)`;


    request.input("id", sql.UniqueIdentifier, randomUUID());
    request.input("email", sql.NVarChar, email);
    request.input("country", sql.NVarChar, user.country);

    const result: IResult<number> = await request.query(queryText);

    return { success: true, 
             code: 201,
             data: result.rowsAffected[0] 
    };
}

export async function updateUser(user: User): Promise<createSuccessService<UserBD> | ErrorService> {
    if (!isValidUser(user)) {
        return { success: false, 
                 code: 400, 
                 message: "Invalid data." };
    }
    const email: string = user.email.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `UPDATE USER SET user_id=@user_id,email=@email,country=@country
    where user.id=@id`;

    request.input("id", sql.UniqueIdentifier, randomUUID());
    request.input("email", sql.NVarChar, email);
    request.input("country", sql.NVarChar, user.country);

    const result: IResult<number> = await request.query(queryText);


    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "User not found"
        }
    }

    return {
        success: true,
        code: 200,
        data: result.rowsAffected[0]
    };
}

export async function deleteUser(idUser: string): Promise<deleteSuccessService | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Delete from User Where User.id=@id`;

    request.input("id", UniqueIdentifier, idUser);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "User not found"
        }
    }
    return {
        success: true,
        code: 204,
    }
}