const fetchPutGoods = async (id) => {
    try {
        await axios.put(`${API_MOCAPI}/Goods/${id}`, isPutData);
        await fetchGetGoods();
    } catch {
        console.log("fetch data PUT cards error");
    }
};