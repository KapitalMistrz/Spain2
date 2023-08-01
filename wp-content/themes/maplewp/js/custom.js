// Custom JS for Maple WP

(function () {
  // Mobile Menu
  const mobileMenu = document.getElementById('menu')
  const menuWrapper = document.getElementById('mobile-nav-wrapper')
  const parentElements = mobileMenu.querySelectorAll('.menu-item-has-children')
  const menuToggleBtn = document.getElementById('mobile-nav-toggle')
  const focusableItems = mobileMenu.querySelectorAll('[tabindex="-1"]')
  const aTags = [ ...mobileMenu.getElementsByTagName('a') ]
  const closeMenu = mobileMenu.querySelector('#close-menu')
  const goToTop = mobileMenu.querySelector('.go-to-top')
  const goToBottom = mobileMenu.querySelector('.go-to-bottom')

  const toggleSubMenu = element => {
    element.style.display = element.style.display == '' ? 'block' : ''
  }

  const isToggleChecked = () => {
    return menuToggleBtn.checked ? true : false
  }

  toggleTabIndex = elements => {
    elements.forEach(element => {
      element.tabIndex = element.tabIndex == `-1` ? `0` : `-1`
    })
  }

  goToTop.onfocus = () => {
    closeMenu.focus()
  }

  goToBottom.onfocus = () => {
    aTags[aTags.length - 1].focus()
  }

  menuToggleBtn.addEventListener('click', () => {
    toggleTabIndex(focusableItems)
    aTags[0].focus()
  })

  // Toggle sub-menu on arrow click
  parentElements.forEach(element => {
    const arrow = element.querySelector('span.dropdown-arrow')
    const subMenu = arrow.nextElementSibling

    arrow.addEventListener('click', () => {
      toggleSubMenu(subMenu)
    })
    arrow.addEventListener('keydown', e => {
      if ( e.keyCode == 32 ) {
        e.preventDefault()
        toggleSubMenu(subMenu)
      }
    })
  })

  // Check if clicked on Toggle Button
  document.querySelector('body').addEventListener('click', event => {
    if (
      !menuWrapper.contains(event.target) && menuToggleBtn.checked ||
      event.target == closeMenu
      )
     {
      mobileMenu.style.transform = `translateX(100%)`
      mobileMenu.setAttribute('style', '')
      menuToggleBtn.checked = false
      toggleTabIndex(focusableItems)
      menuToggleBtn.focus()
    }
  })
})()
