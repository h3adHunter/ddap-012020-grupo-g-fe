const state = {
    products: []
}

const actions = {
    addProduct({ dispatch, commit }, product) {
        if (product.quantity <= product.stock) {
            commit('addCart', product)
            dispatch('alert/success', 'Producto agregado al carrito correctamente.', { root: true });
        } else {
            dispatch('alert/error', 'Stock insuficiente.', { root: true });
        }
    }
};

const mutations = {
    addCart(state, product) {
        state.products.push(product)
    }
};

export const cart = {
    namespaced: true,
    state,
    actions,
    mutations
};