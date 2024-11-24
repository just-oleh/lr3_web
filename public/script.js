document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const authorInput = document.getElementById('author');
    const postList = document.getElementById('postList');

    function fetchPosts() {
        fetch('/api/posts')
            .then(response => response.json())
            .then(posts => {
                postList.innerHTML = '';
                posts.forEach(post => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>${post.title}</strong><br>
                        ${post.description}<br>
                        <em>by ${post.author}</em>
                        <button class="edit" data-id="${post.id}">Edit</button>
                        <button class="delete" data-id="${post.id}">Delete</button>
                    `;
                    postList.appendChild(li);
                });

                document.querySelectorAll('.edit').forEach(button => {
                    button.addEventListener('click', handleEdit);
                });
                document.querySelectorAll('.delete').forEach(button => {
                    button.addEventListener('click', handleDelete);
                });
            });
    }

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const newPost = {
            title: titleInput.value,
            description: descriptionInput.value,
            author: authorInput.value
        };

        fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
        .then(response => response.json())
        .then(() => {
            fetchPosts();
            postForm.reset();
        });
    });

    function handleEdit(event) {
        const postId = event.target.getAttribute('data-id');
        const postTitle = prompt('Enter new title:');
        const postDescription = prompt('Enter new description:');
        const postAuthor = prompt('Enter new author:');
        
        const updatedPost = {
            title: postTitle,
            description: postDescription,
            author: postAuthor
        };

        fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        })
        .then(response => response.json())
        .then(() => fetchPosts());
    }

    function handleDelete(event) {
        const postId = event.target.getAttribute('data-id');

        fetch(`/api/posts/${postId}`, {
            method: 'DELETE'
        })
        .then(() => fetchPosts());
    }

    fetchPosts();
});
