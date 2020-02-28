window.addEventListener("DOMContentLoaded", function(){
    let headings = document.getElementsByClassName("accordion-heading");
    for (let heading of headings) {
        heading.onclick = function() {
            this.parentElement.classList.toggle("accordion-element-active");
        }
    }
});