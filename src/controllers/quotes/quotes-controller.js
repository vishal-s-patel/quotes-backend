const { StatusCodes } = require('http-status-codes');
const quotesHelper = require('../../helpers/quotes-helper');

exports.AddPost = async (req, res) => {
    try {
        const result = await quotesHelper.addPost(req.body);
        return res.status(StatusCodes.OK).json({
            data: result,
            message: 'Post added successfully'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error.message
        })
    }
}

exports.GetPosts = async (req, res) => {
    try {
        const result = await quotesHelper.getPost();
        if (result.length === 0) {
            return res.status(StatusCodes.NO_CONTENT).json({
                data: [],
                message: 'Post not available'
            })
        }
        return res.status(StatusCodes.OK).json({
            data: result,
            message: 'Posts fetched successfully'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error.message
        })
    }
}

exports.UpdatePost = async (req, res) => {
    try {
        const result = await quotesHelper.updatePost(req.params.id, req.body);
        if (result.matchedCount === 0) {
            return res.status(StatusCodes.NO_CONTENT).json({
                data: result,
                message: 'Id not found'
            })
        }
        return res.status(StatusCodes.OK).json({
            data: result,
            message: 'Post updated successfully'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message,
            message: 'Error in updating post'
        })
    }
}

exports.DeletePost = async (req, res) => {
    try {
        const result = await quotesHelper.deletePost(req.params.id);
        if (result.matchedCount === 0) {
            return res.status(StatusCodes.NO_CONTENT).json({
                data: result,
                message: 'Id not found'
            })
        }
        return res.status(StatusCodes.OK).json({
            data: result,
            message: 'Post deleted successfully'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message,
            message: 'Error in deleting post'
        })
    }
}