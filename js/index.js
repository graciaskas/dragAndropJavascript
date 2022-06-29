window.addEventListener("DOMContentLoaded",(e)=>{
    e.preventDefault();
    init();
})


const containers = document.querySelectorAll('.container');
const dragables = document.querySelectorAll('.dragable');


function init(){

    dragables.forEach( dragable => {
        dragable.addEventListener("dragstart",(ev) => {
            dragable.classList.add("draging")
            addClass(ev)
        });
    
        dragable.addEventListener("dragend",(ev)=>{
            dragable.classList.remove("draging");
            RemoveaddClass(ev)
        });
    });
    
    
    containers.forEach( container => {
        //event when a container is hovered a div element
        container.addEventListener("dragover",(e) => {
            e.preventDefault();
            const dragable = document.querySelector(".draging");
            container.appendChild(dragable);
    
            //Get container items count minus the header elements
            let children_count = container.children.length - 1;

            //update count
            container.firstElementChild.getElementsByClassName("count")[0].textContent = children_count;

            //fill the progress bar
            container.firstElementChild.getElementsByClassName("pr_level")[0].style.width = (5 * children_count);
        });
    });

    //Function to update every 100ms the count of the container
    const update_container_count = () => {
        setInterval(()=>{
            containers.forEach(container => {
                //Get container items count minus the header elements
                let children_count = container.children.length - 1;
   
                //update count on UI
                container.firstElementChild.getElementsByClassName("count")[0].textContent = children_count;

                //set default percentage of an item
                let pr_level_width = ( children_count * 5);

                //check if the percentage is greater than 100%
                if(pr_level_width >= 100){
                    container.firstElementChild.getElementsByClassName("pr_level")[0].style.width =  "100%";
                }else{
                    container.firstElementChild.getElementsByClassName("pr_level")[0].style.width =  pr_level_width +"%";
                }
                
            });

        },50);  
    };

    const addClass = (ev) => {
        ev.target.style.background = '#fff';
        ev.target.style.boxShadow = '2px 2px 5px 1px rgba(144, 144, 144, 0.39)';
        ev.target.style.transform = 'rotate(-3deg) skew(5deg)';
    }
    
    const RemoveaddClass = (ev) => {
        ev.target.style.background = '#f1f1f18a';
        ev.target.style.boxShadow = '0 0 0px';
        ev.target.style.transform = '';
    }

    //updater function invocation
    update_container_count();
}