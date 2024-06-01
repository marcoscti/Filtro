class Filtro {

    constructor() {
        this.divDadosFiltrados = document.querySelector('.dadosFiltrados')
        this.clickButton(document.querySelector('.listThemes'))
        this.renderAllCards()
        this.renderLinks(this.createFilterThemes(apiLista))
    }
    createFilterThemes(arrayDados) {
        /**
         * Retorna um array sem dados duplicados
         */
        const map = new Map()
        arrayDados.forEach(i => (
            map.set(i.categoria, i)
        ))
        const list = Array.from(map.values())
        return list
    }
    clickButton(element) {
        element.addEventListener('click', (event) => {
            this.divDadosFiltrados.innerHTML = ""
            this.renderCardFilter(this.dadosFiltrados(apiLista, event.target.hash.replaceAll('#', '')))
        })
    }
    dadosFiltrados(arrayFiltrado, theme) {
        return arrayFiltrado.filter((e) => {
            if (e.categoria.toLowerCase() == theme) {
                return e
            }
        })
    }
    renderLinks(arrayData) {
        let divListThemes = document.querySelector('.listThemes')
        arrayData.forEach((e) => (
            e.activeCategoria && divListThemes.insertAdjacentHTML("beforeend", this.renderButtonLink(`${e.categoria.replaceAll(' ', '-')}`))
        ))
    }
    renderButtonLink(data) {
        return `<a href="#${data.toLowerCase()}" id="--${data.toLowerCase()}">${data}</a>`
    }
    renderCardFilter(arrayFiltro) {
        arrayFiltro.map((element) => {
            this.divDadosFiltrados.setAttribute('class', 'dadosFiltrados content')
            this.divDadosFiltrados.setAttribute('id', `${element.categoria.toLowerCase()}`)
            this.divDadosFiltrados.insertAdjacentHTML("beforeend", `<button class='card'>${element.description}</button>`)
            document.querySelector('.title').innerHTML = element.categoria
        })
    }
    renderAllCards() {
        let divListThemes = document.querySelector('.dadosFiltrados')
        this.createFilterThemes(apiLista).filter((element) => {
            element.activeCategoria && divListThemes.insertAdjacentHTML("beforeend", `<div class="container"><p class="title">${element.activeCategoria ? element.categoria : ''}</p><div id="${element.categoria.toLowerCase()}" class="content"></div></div>`)
            element.activeCategoria && apiListar(element.categoria)
        })

        function apiListar(element) {
            apiLista.filter((e) => {
                if (e.categoria == element && e.activeCategoria) {
                    return e.activeCard && document.querySelector(`#${element.toLowerCase()}`).insertAdjacentHTML("beforeend", `<button class='card'>${e.description}</button>`)
                }
            })
        }
    }
}

new Filtro()