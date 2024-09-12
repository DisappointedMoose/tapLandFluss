import base_categories from './categories/base_categories.json';
import adult_categories from './categories/adult_categories.json';

function tlf_categories() {
    return {
        includeAdultCategories: false,

        getList: function () {
            let categories = base_categories;

            if(this.includeAdultCategories) {
                categories = categories.concat(adult_categories);
            }

            return categories;
        }
    }
}

window.tlf_categories = tlf_categories;