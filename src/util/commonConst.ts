import {
    FROM_EMAIL
} from "@config/secret";
export const commonConst = {
    emailSource: FROM_EMAIL,
    userListRecordSize: 20,
    disableUser: 1,
    enableUser: 2,
    deleteUser: 3,
    ypCategoryActive: true,
    ypNotJoined: 0,
    ypJoined: 1,
} as const;