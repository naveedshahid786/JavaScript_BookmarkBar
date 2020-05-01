const draggables = document.querySelectorAll('.draggable')
        const containers = document.querySelectorAll('.container')

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging')
            })

            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging')
            })
        })

        containers.forEach(container => {
            container.addEventListener('dragover', event => {
                event.preventDefault()
                const aElement = getDragAfterElement(container, event.clientY)
                const draggable = document.querySelector('.dragging')
                if (aElement == null) {
                    container.appendChild(draggable)
                } else {
                    container.insertBefore(draggable, aElement)
                }
            })
        })

        function getDragAfterElement(container, y) {
            const dragAbleElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

            return dragAbleElements.reduce((closest, child) => {
                const wrapper = child.getBoundingClientRect()
                const offSet = y - wrapper.top - wrapper.height / 2
                if (offSet < 0 && offSet > closest.offSet) {
                    return { offSet: offSet, element: child }
                } else {
                    return closest
                }
            }, { offSet: Number.NEGATIVE_INFINITY }).element
        }