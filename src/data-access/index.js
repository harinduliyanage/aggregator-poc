/**
 * @file - index
 * @description - This exports the database access layer.
 */
import RepositoryStore from "./mongodb/store/repository-store";
import connect from "./mongodb/config/mongoose";

// exporting repository store for the external usage.
export {
    RepositoryStore,
    connect
}
