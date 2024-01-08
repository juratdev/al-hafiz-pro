 function scrollToSection(sectionId, event) {
    console.log(event)
    event.preventDefault()
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth", block: "center"})
}