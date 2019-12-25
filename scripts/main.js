const reset = document.querySelector("#reset");
reset.addEventListener("click", clearGrid);

let currentMode = "simple";
const modes = Array.from(document.querySelectorAll("input[type=radio]"));
modes.forEach(mode => { 
    mode.addEventListener("click", (e) => {
        if (e.target.getAttribute("value") !== currentMode)
        {
            currentMode = e.target.getAttribute("value");
            clearGrid();
        }
    })
});

setGrid(16);


function setGrid(side) {
    let container = document.querySelector("#grid");
    let rowHeight = Math.floor((container.clientWidth / side) * 1);
    while (container.hasChildNodes())
        container.removeChild(container.firstChild);

    for (let r = 0; r < side; r++)
    {
        let row = document.createElement("div");
        row.classList.add("row");
        row.style.height = rowHeight + "px";

        for (let col = 0; col < side; col++)
        {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.backgroundColor = "white";
            row.append(cell);

            cell.addEventListener("mouseover", color);
        }
        container.append(row);
    }
}
function clearGrid()
{
    let side = document.querySelector("#size").value;
    if (!isNaN(side) && Number.isInteger(+side) && side > 0 && side < 101)
        setGrid(side);
}

function color(e) {
    
    for (let mode in modes)
    {
        if (modes[mode].checked)
        {
            switch (modes[mode].getAttribute("value"))
            {
                case "simple":
                    this.style.backgroundColor = "blue";
                    break;
                case "gradual":
                    let color = this.style.backgroundColor;
                    if (!color.includes("rgb"))
                        this.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
                    else if (color.includes("rgba"))
                    {
                     let alpha = color.substring(color.lastIndexOf(" ") + 1, color.lastIndexOf(")"));
                     if (+alpha < 1)
                        this.style.backgroundColor = `rgba(0, 0, 0, ${+alpha + 0.1})`;
                    }
                    break;
                case "rainbow":
                    if (this.style.backgroundColor === "white")
                    {    
                        this.style.backgroundColor = "rgb(" + 
                                    Math.floor(Math.random() * 256) + ", " +
                                    Math.floor(Math.random() * 256) + ", " +
                                    Math.floor(Math.random() * 256) + ")";
                    }
                    break;

                default:
            }
            break;
        }
    }
    
}