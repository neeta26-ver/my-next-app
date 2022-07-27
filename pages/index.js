import Head from 'next/head';

import Nav from '../components/Nav';
import PostCard from '../components/ProductCard';
import styles from '../styles/Home.module.css';

export default function Home({ products }) {
    console.log("products : ",products);
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav />

            <main>
                <div className={styles.container}>
                    {products.length === 0 ? (
                        <h2>No added products</h2>
                    ) : (
                        <ul>
                            {products.map((product, i) => (
                                <PostCard product={product} key={i} />
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    // get the current environment
    let dev = process.env.NODE_ENV !== 'production';
    let { DEV_URL, PROD_URL } = process.env;

    // request posts from api
    let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/products`);
    console.log(response);
    // extract the data
    let data = await response.json();

    return {
        props: {
            products: data['message'],
        },
    };
}