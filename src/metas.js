let titleDescriptionMetas = {
    title: {
        previous: 'Fractional NFT marketplace ᐉ Ownity: Buy and sell fractional NFT'
    },
    description: {
        previous: 'Best trading platform to buy and sell fractionalized NTFs ⭐ Share the cost with other buyers and become an NFT co-owner ➤ Manage your fractional NFT with Ownity DAO and more. '
    }

};

const PageData = [
    {
        pageName: 'Previous',
        title: titleDescriptionMetas.title.previous,
        tags: [
            { name: 'title',
                content: titleDescriptionMetas.title.previous },
            { name: 'description',
                content: titleDescriptionMetas.description.previous },
            { name: 'twitter:title',
                content: titleDescriptionMetas.title.previous },
            { name: 'twitter:description',
                content: titleDescriptionMetas.description.previous },
        ]
    },
]

export const assignMetas = (pageName, path = window.location.href, injectDynamicContent = false, pageData = null) => {
    if(!injectDynamicContent){ // static pages
        let exist = PageData.filter((x) => x.pageName === pageName);
        if(exist.length > 0){
            document.title = exist[0].title;
            // remove stale metas
            Array.from(document.querySelectorAll('[data-vue-meta-controlled]')).map(el => el.parentNode.removeChild(el));

            exist[0].tags.map(tagDef => {
                let tag = document.createElement('meta')
                let urlHelperVal = false // will help us search for 'og:url'
                Object.keys(tagDef).forEach(key => {
                    tag.setAttribute(key, urlHelperVal ? path : tagDef[key]);
                    urlHelperVal = tagDef[key] === "og:url"
                })
                tag.setAttribute('data-vue-meta-controlled', '')
                return tag;
            }).forEach(tag => document.head.appendChild(tag));
        } else {
            // call out when unmounting components assignMetas(''), for to reset to default tags
            //! it can be deleted START
            Array.from(document.querySelectorAll('[data-vue-meta-controlled]')).map(el => el.parentNode.removeChild(el));
            document.title = 'Ownity'
            //! it can be deleted END
        }
    } else { // dynamic pages (e.g blog post page)
        document.title = pageData.title;

        // remove stale metas
        Array.from(document.querySelectorAll('[data-vue-meta-controlled]')).map(el => el.parentNode.removeChild(el));

        pageData.tags.map(tagDef => {
            let tag = document.createElement('meta')
            let urlHelperVal = false // will help us search for 'og:url'
            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, urlHelperVal ? path : tagDef[key]);
                urlHelperVal = tagDef[key] === "og:url"
            })
            tag.setAttribute('data-vue-meta-controlled', '')
            return tag;
        }).forEach(tag => document.head.appendChild(tag));
    }
};