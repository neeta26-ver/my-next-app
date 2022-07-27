import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ProductCard({ product }) {
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // Delete product
    const deleteProduct = async (productsId) => {
        //change deleting state
        setDeleting(true);

        try {
            // Delete product
            await fetch('/api/products', {
                method: 'DELETE',
                body: productsId,
            });

            // reset the deleting state
            setDeleting(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // stop deleting state
            return setDeleting(false);
        }
    };
    return (
        <>
            <li>
                <h3>{product.title}</h3>
                <p>{product.content}</p>
                <small>{new Date(product.createdAt).toLocaleDateString()}</small>
                <br />
                <button type="button" onClick={() => deleteProduct(product['_id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </button>
            </li>
        </>
    );
}