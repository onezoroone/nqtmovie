import unidecode from "unidecode";

function SlugName(name) {
    
    return encodeURIComponent(unidecode(name).toLowerCase().replace(/[^a-z0-9]+/g, "-")).replace(/-$/, "");
}

export default SlugName;