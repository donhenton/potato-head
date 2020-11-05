class FaceMaker {
    constructor() {
        this.message = "get a job"
        this.imageCollection = { heads: [], noses: [], eyes: [], 
            brows:[], hairs: [],
            mouths: [] };

        this.canvasController =null;
    }



    placeImages(type) {
        let headTable = document.querySelector(`#${type}`);
        let numImages = 0;
        let idx = 0;
        let ctPerRow = 4;
        let cssClass = "";
        let imgText = "";

        switch (type) {
            case "heads":
                cssClass = "heads-img-cell";
                imgText = '<img class="head-img" src="images/headimg/heads';
                numImages = 8;
                break;
            case "noses":
                cssClass = "noses-img-cell";
                imgText = '<img class="nose-img" src="images/noseimg/noses';
                numImages = 8;
                break;
            case "eyes":
                cssClass = "eyes-img-cell";
                imgText = '<img class="eye-img" src="images/eyesimg/eyes';
                numImages = 6;

                break;
            case "brows":
                cssClass = "brows-img-cell";
                imgText = '<img class="brow-img" src="images/browsimg/brows';
                numImages = 8;

                break;
            case "hairs":
                cssClass = "hairs-img-cell";
                imgText = '<img class="hair-img" src="images/hairimg/hair';
                numImages = 5;

                break;
            case "mouths":
                cssClass = "mouths-img-cell";
                imgText = '<img class="mouth-img" src="images/mouthsimg/mouths';
                numImages = 5;

                break;


        }


        let numRows = Math.floor(numImages / ctPerRow);
        let leftOver = numImages - numRows * ctPerRow;
        if (leftOver > 0) {
            numRows++;
        }



        for (var i = 0; i < numRows; i++) {

            let row = headTable.insertRow(i);
            for (var r = 0; r < ctPerRow; r++) {

                let currentIdx = idx = idx + 1;

                let cell = row.insertCell(r);
                cell.setAttribute("class", cssClass);
                if (idx <= numImages) {
                    cell.innerHTML = imgText + `${idx}.png">`;
                    let iNode = cell.childNodes[0];
                    
                    this.imageCollection[type].push(iNode);
                    let clickMethod = (ev) => this.selectImage(ev, type, currentIdx);
                    iNode.addEventListener('click', clickMethod)

                }


            }

        }

    };




    selectImage(ev, type, index) {
        console.log(`asking for ${type} ${index}`);
        //canvasController.updateImage(type,index);
    }


    init() {
        this.placeImages("heads");
        this.placeImages("noses");
        this.placeImages("eyes");
        this.placeImages('brows');
        this.placeImages('hairs');
        this.placeImages('mouths');
        this.canvasController = new CanvasController(this.imageCollection, {width: 500,height: 500});
    }


}//end class










function init() {

    let maker = new FaceMaker();
    maker.init();

}

init();