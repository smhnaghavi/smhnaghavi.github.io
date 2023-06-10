/**
 * Search function
 */
function searchFunc() {
    let searchPhrase = document.getElementById("searchbox").value;
    let entries = document.getElementById("entries");
    entries.innerHTML = "";
    fetch(`assets/MD/blog/posts.md`)
        .then((res) => res.text())
        .then((text) => {
            let posts = [];
            text.split("---------------------\n").forEach(item => {
                posts.push(item.split("\n"));
            });
            posts.forEach(post => {
                fetch(`${post[5]}`)
                    .then((res) => res.text())
                    .then((text) => {
                        text = text.split("---------------------\n")[1];
                        if (text.search(searchPhrase) !== -1) {
                            entries.innerHTML += `<article class="entry"><div class="entry-img"><img src="${post[0]}" alt="" class="img-fluid"></div><h2 class="entry-title"><a href="blog-single.html">${post[1]}</a></h2><div class="entry-meta"><ul><li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">${post[2]}</a></li><li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html">${post[3]}</a></li></ul></div><div class="entry-content"><p>${post[4]}</p><button class="btn btn-danger" onclick="showPost('${post[5]}')">مطالعه‌ی بیشتر</button></div></article>`;
                        } else {
                            entries.innerHTML = "<p>متاسفانه مطلبی مرتبط با جست و جوی شما یافت نشد.</p>"
                        }
                    })
                    .catch((e) => console.error(e));
            });
        })
        .catch((e) => console.error(e));
}

/**
 * Show post function
 */
function showPost(article) {
    let entries = document.getElementById("entries");
    let converter = new showdown.Converter();
    fetch(article)
        .then((res) => res.text())
        .then((text) => {
            text = text.split("---------------------\n");
            let details = text[0].split("\n");
            let html = converter.makeHtml(text[1]);
            entries.innerHTML = "";
            entries.innerHTML += `<article class="entry"><div class="entry-img"><img src="${details[0]}" alt="" class="img-fluid"></div><h2 class="entry-title"><a href="blog-single.html">${details[1]}</a></h2><div class="entry-meta"><ul><li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">${details[2]}</a></li><li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html">${details[3]}</a></li></ul></div><div class="entry-content">${html}<div class="read-more"><a href="blog.html">بازگشت</a></div></div></article>`;
            entries.innerHTML += `<div class="blog-author d-flex align-items-center"><img src="${details[6]}" class="rounded-circle float-left" alt=""><div class="container"><h4>${details[2]}</h4><div class="social-links"><a href="mailto:${details[7]}"><i class="bi bi-envelope"></i></a><a href="${details[8]}"><i class="bi bi-github"></i></a></div><p>"${details[9]}"</p></div></div>`;
        })
        .catch((e) => console.error(e));
}


/**
 * Show posts by tag
 */
function showTagPosts(tag) {
    fetch(`assets/MD/blog/tags/${tag}.md`)
        .then((res) => res.text())
        .then((text) => {
            let posts = [];
            text.split("---------------------\n").forEach(item => {
                posts.push(item.split("\n"));
            });
            let entries = document.getElementById("entries");
            entries.innerHTML = "";
            posts.forEach(post => {
                entries.innerHTML += `<article class="entry"><div class="entry-img"><img src="${post[0]}" alt="" class="img-fluid"></div><h2 class="entry-title"><a href="blog-single.html">${post[1]}</a></h2><div class="entry-meta"><ul><li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">${post[2]}</a></li><li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html">${post[3]}</a></li></ul></div><div class="entry-content"><p>${post[4]}</p><button class="btn btn-danger" onclick="showPost('${post[5]}')">مطالعه‌ی بیشتر</button></div></article>`;
            });
            // entries.innerHTML += '<div class="blog-pagination"><ul class="justify-content-center"><li class="active"><a href="#">1</a></li></ul></div>';
        })
        .catch((e) => console.error(e));
}


/**
 * Show posts by categories
 */
function showCatPosts(cat) {
    fetch(`assets/MD/blog/categories/${cat}.md`)
        .then((res) => res.text())
        .then((text) => {
            let posts = [];
            text.split("---------------------\n").forEach(item => {
                posts.push(item.split("\n"));
            });
            let entries = document.getElementById("entries");
            entries.innerHTML = "";
            posts.forEach(post => {
                entries.innerHTML += `<article class="entry"><div class="entry-img"><img src="${post[0]}" alt="" class="img-fluid"></div><h2 class="entry-title"><a href="blog-single.html">${post[1]}</a></h2><div class="entry-meta"><ul><li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">${post[2]}</a></li><li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html">${post[3]}</a></li></ul></div><div class="entry-content"><p>${post[4]}</p><button class="btn btn-danger" onclick="showPost('${post[5]}')">مطالعه‌ی بیشتر</button></div></article>`;
            });
            // entries.innerHTML += '<div class="blog-pagination"><ul class="justify-content-center"><li class="active"><a href="#">1</a></li></ul></div>';
        })
        .catch((e) => console.error(e));
}


/**
 * Show tags in blog sidebar
 */
fetch("assets/MD/blog/tags.md")
    .then((res) => res.text())
    .then((text) => {
        const tags = text.split("\n");
        let tagsUL = document.getElementById("tags");
        tags.forEach(tag => {
            tagsUL.innerHTML += `<li><a onclick="showTagPosts('${tag}')">${tag}</a></li>`;
        });
    })
    .catch((e) => console.error(e));


/**
 * Show categories in blog sidebar
 */
fetch("assets/MD/blog/categories.md")
    .then((res) => res.text())
    .then((text) => {
        let cats = [];
        text.split("\n").forEach(item => {
            cats.push(item.split(" : "));
        });
        let catsUL = document.getElementById("categories");
        cats.forEach(cat => {
            catsUL.innerHTML += `<li><a onclick="showCatPosts('${cat[0]}')">${cat[0]} <span>(${cat[1]})</span></a></li>`
        });
    })
    .catch((e) => console.error(e));


/**
 * Show Posts
 */
fetch("assets/MD/blog/posts.md")
    .then((res) => res.text())
    .then((text) => {
        let posts = [];
        text.split("---------------------\n").forEach(item => {
            posts.push(item.split("\n"));
        });
        let entries = document.getElementById("entries");
        posts.forEach(post => {
            entries.innerHTML += `<article class="entry"><div class="entry-img"><img src="${post[0]}" alt="" class="img-fluid"></div><h2 class="entry-title"><a href="blog-single.html">${post[1]}</a></h2><div class="entry-meta"><ul><li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">${post[2]}</a></li><li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html">${post[3]}</a></li></ul></div><div class="entry-content"><p>${post[4]}</p><button class="btn btn-danger" onclick="showPost('${post[5]}')">مطالعه‌ی بیشتر</button></div></article>`;
        });
        // entries.innerHTML += '<div class="blog-pagination"><ul class="justify-content-center"><li class="active"><a href="#">1</a></li></ul></div>';
    })
    .catch((e) => console.error(e));