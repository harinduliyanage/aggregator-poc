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
        return await new this.entityModel(entity).save()
    }

    /**
     * generic update functionality
     * @param property
     * @param value
     * @returns {Promise<*>}
     */
    async update(property, value) {
        let query = {}
        query[property] = value;
        return await this.entityModel.updateOne({}, query );
    }

    /**
     * generic find one document functionality
     * @param property
     * @param value
     * @returns {Promise<*>}
     */
    async findOne(property, value) {
        let query = {}
        query[property] = value;
        return await this.entityModel.findOne(query);
    }

    /**
     * generic find all functionality
     * @returns {Promise<void>}
     */
    async findAll(){
        return await this.entityModel.find();
    }

    /**
     * generic delete functionality
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id){
        return await this.entityModel.deleteOne({ _id: id });
    }
}
