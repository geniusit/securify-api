import {Entity, Schema} from "redis-om";

class User extends Entity {

    toJSON(){
        return{
            id: this.entityId,
            name: this.name,
            email: this.email,
            active: this.active
        }
    }
}

export const userSchema = new Schema(User, {
    name:{
        type: 'string'
    },
    email:{
        type: 'string'
    },
    active: {
        type: 'boolean'
    }
}, {
    dataStructure: 'JSON'
})