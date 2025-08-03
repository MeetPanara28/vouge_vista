import React, { useEffect, useState } from 'react';

function ProductTable({ categorie = 'Men' }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const formData = new FormData();

        fetch('http://localhost:8000/api/all_product/', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error('Fetch error:', err));
    }, [categorie]);
    console.log(products);

    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const getCsrfToken = async () => {
            const response = await fetch('http://localhost:8000/api/get-csrf-token/', {
                method: 'GET',
                mode: 'cors',
            });
            const data = await response.json();
            setCsrfToken(data.csrfToken);
        };
        getCsrfToken();
    }, []);

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Montserrat' }}>
            <thead>
                <tr style={{ backgroundColor: '#f84258', color: 'white' }}>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {products.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #ccc' }}>
                        <td>{p.name}</td>
                        <td>{p.price}</td>
                        <td>{p.categorie}</td>
                        <td><img src={`http://localhost:8000${p.image}`} alt={p.name} width="50" /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ProductTable;