"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeUrl;
function makeUrl(type, id) {
    let contentUrl = 'http://localhost:8000/';
    if (type === 'authors' || type === 'books' || type === 'available') {
        return contentUrl + type;
    }
    if (type === 'book_dtls' && id) {
        return contentUrl + type + '?id=' + id;
    }
    throw new Error('Invalid type or missing id for book_dtls');
}
