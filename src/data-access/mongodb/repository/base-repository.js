/**
 * Base Repository defines all generic functionality of the database operations.
 */
class BaseRepository {

    constructor(entityModel) {
        /** defines the entity model and resolves automatically with implemented repository type */
        this.entityModel = entityModel;
    }

    /**
     * Generic Save Functionality
     *
     * @param entity
     * @returns {Promise<*>}
     */
    async save(entity) {
        return await new this.entityModel(entity).save()
    }

    /**
     * Generic Update Functionality
     *
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
     * Generic Find One Document Functionality
     *
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
     * Generic Find All Functionality
     *
     * @returns {Promise<void>}
     */
    async findAll(){
        return await this.entityModel.find();
    }

    /**
     * Generic Delete Functionality
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id){
        return await this.entityModel.deleteOne({ _id: id });
    }
}

/** exporting base repository */
module.exports = BaseRepository;