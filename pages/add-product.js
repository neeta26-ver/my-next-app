import { useState } from 'react';

import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!title || !desc) return setError('All fields are required');

        // post structure
        let post = {
            title,
            desc,
            published: false,
            createdAt: new Date().toISOString(),
        };
        // save the post
        let response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(post),
        });

        // get the data
        let data = await response.json();

        if (data.success) {
            // reset the fields
            setTitle('');
            setDesc('');
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
            return setError(data.message);
        }
    };

    return (
        <div>
            <Nav />
            <div className={styles.container}>
                <form onSubmit={handlePost} className={styles.form}>
                    {error ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.error}>{error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.message}>{message}</h3>
                        </div>
                    ) : null}
                    <div className={styles.formItem}>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="title"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>Description</label>
                        <textarea
                            name="desc"
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            placeholder="Product Description"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <button type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}