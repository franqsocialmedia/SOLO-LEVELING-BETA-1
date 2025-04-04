/**
 * Inserts CSS to element
 * @param {StylesObject}} Styles object
 * @returns {HTMLElement}
 */
HTMLElement.prototype.css = function (object) {
    Object.assign(this.style, object);
    return this;
  };
  
  /**
   * Inserts new properties to element
   * @param {StylesObject}} Styles object
   * @returns {HTMLElement}
   */
  HTMLElement.prototype.attr = function (object) {
    return Object.assign(this, object);
  };
  
  /**
   * Renderer for element nodes
   * @param {Sring | Array} tag HTMLElement valid tag name
   * @param {HTMLElement} parent Element valid parent node
   * @param {String} classList Space separated class names
   * @returns {HTMLElement}
   */
  function render(tag, parent, classList = undefined) {
    const renderElement = (t) => {
      const elem = document.createElement(t);
  
      if (typeof classList == "string" && classList.length > 0) {
        classList.split(" ").forEach((cls) => {
          elem.classList.add(cls);
        });
      }
  
      if (parent) parent.appendChild(elem);
  
      return elem;
    };
  
    return Array.isArray(tag)
      ? Array(tag[1])
          .fill(tag[0])
          .map((t) => renderElement(t))
      : renderElement(tag);
  }



  /*
  Ejemplos:

const pencilButton = render("div", this.parent).css({
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            backgroundColor: btn.background,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "25px",
            border: "5px solid rgb(48, 54, 61)",
            cursor: "context-menu"
        });
  */