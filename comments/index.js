const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')


const app = express()
app.use(bodyParser.json())
app.use(cors())


const commentsByPostId = {}


app.get('/posts/:id/comments', (req, res)=> {
    // If comment id is in the object, return it 
    // otherwise return empty array:
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    // Generate random ID for comment:
    const commentId = randomBytes(4).toString('hex')
    // Get the content from the request body:
    const { content } = req.body
    // If data, set to comments object:
    const comments  = commentsByPostId[req.params.id] || []
    // Push new comment into comments object:
    comments.push({ id: commentId, content, status: 'pending' })
    // Assign comments array to comments var:
    commentsByPostId[req.params.id] = comments
    // Fire Event:
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending',
        }
    })
    // Return comments:
    res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
    console.log('Event Received', req.body.type)

    const { type, data } = req.body

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data

        const comments = commentsByPostId[postId]

        const comment = comments.find(comment => {
            return comment.id === id
        })

        comment.status = status

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content,
            }
        })
    }

    res.send({})
})

app.listen(4001, () => {
    console.log("Comments on 4001")
})