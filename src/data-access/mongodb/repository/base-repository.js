/**
 * @file - base repository
 * @description - base repository defines all generic functionality of the database operations.
 */
export default class BaseRepository {

    constructor(entityModel) {
        // defines the entity model and resolves automatically with implemented repository type
        this.entityModel = entityModel;
    }

    /**
     * generic save functionality
     * @param entity
     * @returns {Promise<*>}
     */
    async save(entity) {
        return this.entityModel.create(entity);
    }

    /**
     * generic delete functionality
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id){
        const entityModel = await this.findOne({_id: id});
        entityModel.remove();
    }
    /**
     * delete many device model in db
     * @param {Object} filter
     * @return {Promise<void>}
     */
    async deleteMany(filter) {
        return this.entityModel.deleteMany(filter);
    }

    /**
     * update DeviceModel  in db
     * @param {*} object
     * @return {Promise<*>}
     */
    async update(object) {
        await object.save();
        return object;
    }

    /**
     * generic find entity by id functionality
     * @param {String} id
     * @return {Promise<*>}
     */
    async findById(id) {
        return this.findOne({_id: id});
    }

    /**
     * generic find one functionality
     * @param filter
     * @return {Promise<*>}
     */
    async findOne(filter) {
        return this.entityModel.findOne(filter);
    }

    /**
     * generic find functionality
     * @param filter
     * @return {Promise<[*]>}
     */
    async find(filter) {
        return this.entityModel.find(filter);
    }

    /**
     * generic find as paginated list functionality
     * @param {Object} filter - filter object
     * @param {Object} options - Query options
     * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
     * @param {number} [options.limit] - Maximum number of results per page (default = 10)
     * @param {number} [options.page] - Current page (default = 1)
     * @returns {Promise<QueryResult>}
     **/
    async getPaginatedList(filter, options) {
        return this.entityModel.paginate(filter, options);
    }

    /**
     * generic save list of entity functionality
     * @param entities
     * @return {Promise<*>}
     */
    async saveList(entities) {
        return this.entityModel.insertMany(entities);
    }
}
