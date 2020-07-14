const state = {
    shops: null
}

const actions = {
    addProduct({ dispatch, commit }, { shop, product }) {
        if (product.quantity <= product.stock) {
            commit('addCart', { shop, product })
            dispatch('alert/success', 'Producto agregado al carrito correctamente.', { root: true });
        } else {
            dispatch('alert/error', 'Stock insuficiente.', { root: true });
        }
    }
};

const mutations = {
    addCart(state, { shop, product }) {
        const shopAlreadyAdded = state.shops ? state.shops.find( cartShop => cartShop._id === shop._id) : false
        if (shopAlreadyAdded) {
            shopAlreadyAdded.products.push(product)
        } else {
            shop.products = [product]
            state.shops ? state.shops.push(shop) : state.shops = [shop]
        }
    }
};

export const cart = {
    namespaced: true,
    state,
    actions,
    mutations
};