const {Schema, model} = require('mongoose')

const schema = new Schema({
    content:  {type: String, required:true},
    // На чьей странице находиться комментарий, Айди пользователя
	pageId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    // Кто оставил комментарий
	userId: {type: Schema.Types.ObjectId, ref: 'Profession', required: true}
}, {
    timestamps: {createdAt: 'created_at'}
})

module.exports = model('Comment', schema)