const Quote = require('../models/quotes');

exports.addPost = (payload) => {

    const newquote = new Quote({
        quote: payload.quote,
        user: payload.user
    });
    return newquote.save();
}

exports.getPost = () => {
    return Quote.aggregate([
        {
            $match: {
                deleted: false
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'USER'
            }
        },
        {
            $unwind: "$USER"
        }
    ]);
}

exports.updatePost = (quoteId, payload) => {
    return Quote.updateOne(
        {
            _id: quoteId
        },
        {
            quote: payload.quote,
            updatedAt: Date.now()
        }
    )
}

exports.deletePost = (quoteId) => {
    return Quote.updateOne(
        {
            _id: quoteId
        },
        {
            deleted: true,
            deletedAt: Date.now()
        }
    )
}