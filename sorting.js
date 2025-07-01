bars = [];
barValues = [];
heights = [];
// hello
var slider = document.getElementById("myRange");
var slider1 = document.getElementById("myRange1");
let n = slider.value;
let container = document.getElementById('container');
let height = container.offsetHeight;
let width = container.offsetWidth;
let barWidth = width / n;
let delay = slider1.value;
function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}
let isStopped = false;
async function generateArray() {
    isStopped = true;
    container.innerHTML = "";
    for (let i = 0; i < n; i++) {
        heights[i] = parseInt(getRandomValue(1, height));
        bars[i] = document.createElement('div');
        bars[i].style.width = `${barWidth}px`;
        bars[i].style.height = `${heights[i]}px`;
        bars[i].style.transform = `translate(${i * barWidth + i}px)`;
        bars[i].style.backgroundColor = 'white';
        bars[i].className = 'bar';
        container.appendChild(bars[i]);
        console.log(bars[i].style.width);
        if (n <= 60) {
            barValues[i] = document.createElement('div');
            barValues[i].innerHTML = heights[i];
            barValues[i].style.transform = `translate(${i * barWidth + i}px)`;
            barValues[i].className = 'barValue';
            container.appendChild(barValues[i]);
        }
    }
    isStopped = false;
}


//Selection Sort Option
let r1, r2, r3, r4, r5;
async function select() {
    isStopped = true;
    await sleep(delay);
    r1 = document.getElementById('bubbleSort');
    r2 = document.getElementById('selectionSort');
    r3 = document.getElementById('insertionSort');
    r4 = document.getElementById('mergeSort');
    r5 = document.getElementById('quickSort');

    if (r1.checked) {
        await generateArray();
        bubbleSort();
    }
    if (r2.checked) {
        await generateArray();
        selectionSort();
    }
    if (r3.checked) {
        await generateArray();

        insertionSort();
    }
    if (r4.checked) {
        await generateArray();
        mergeSort();
    }
    if (r5.checked) {
        await generateArray();
        quickSortIterative(heights, 0, heights.length - 1);
    }
}
//Slider
slider.oninput = function () {
    n = this.value;
    barWidth = width / n - 1;
    isStopped = true;
    generateArray();
    //   console.log(n);
}
slider1.oninput = function () {
    isStopped = true;
    delay = 1000 - this.value;
    generateArray();
    //   console.log("dealay " +delay);
    //   console.log("Elements " +n);
}

generateArray();
async function reset() {
    for (let i = 0; i < n; i++) {
        bars[i].style.backgroundColor = "pink";
        await sleep(10);
    }
    await sleep(delay);
    for (let i = 0; i < n; i++) {
        bars[i].style.backgroundColor = "white";
    }
}
function colors(coloum, color) {
    // console.log("colors " + coloum);
    // console.log("colors " + color);

    for (let i = 0; i < n; i++) {
        bars[i].style.backgroundColor = "white";
        for (let j = 0; j < coloum.length; j++) {
            if (i == coloum[j]) {
                bars[i].style.backgroundColor = color[j];
                break;
            }
        }
    }
}
function swap(i, minindex) {
    [heights[i], heights[minindex]] = [heights[minindex], heights[i]];

    [bars[i], bars[minindex]] = [bars[minindex], bars[i]];
    [bars[i].style.transform, bars[minindex].style.transform] = [bars[minindex].style.transform, bars[i].style.transform];

    [barValues[i], barValues[minindex]] = [barValues[minindex], barValues[i]];
    [barValues[i].style.transform, barValues[minindex].style.transform] = [
        barValues[minindex].style.transform,
        barValues[i].style.transform,
    ];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//Information about Colors
async function colorInfo(color, colInfo) {
    if (isStopped) {
        colors([], []);
        return;
    }
    console.log("Color-Info");
    let col1 = document.createElement('div');
    col1.className = 'col-box';
    let singcol1 = document.createElement('div');
    singcol1.className = 'colorPallet';
    singcol1.style.background = `${color}`;
    let col1Val = document.createElement('div');
    col1Val.className = 'col-info';
    col1Val.innerHTML = `${colInfo}`;
    col1.appendChild(singcol1);
    col1.appendChild(col1Val);
    return col1;
}
//Bubble Sort
async function bubbleSort() {
    if (!r1.checked)
        return;
    sorted = [];
    sortedCol = [];
    let sing = document.createElement('div');
    sing.className = 'sing';
    sing.appendChild(await colorInfo('red', 'Comparing Element'));
    sing.appendChild(await colorInfo('Blue', 'Comparing Element'));
    sing.appendChild(await colorInfo('Yellow', 'Sorted Array'));
    container.appendChild(sing);
    console.log(heights);
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            console.log(j);
            if (isStopped) {
                colors([], []);
                return;
            }
            if (heights[j] > heights[j + 1]) {
                swap(j, j + 1);
            }
            colors([j, j + 1, ...sorted], ["red", "blue", ...sortedCol]);
            if (isStopped) {
                colors([], []);
                return;
            }
            await sleep(delay);
            if (isStopped) {
                colors([], []);
                return;
            }
        }

        sorted[i] = n - i - 1;
        sortedCol[i] = 'yellow';
    }
    isStopped = true;
    reset();
}
// bubbleSort();


//Selection Sort
async function selectionSort() {
    if (!r2.checked)
        return;
    console.log("Selection Sort");
    sorted = [];
    sortedCol = [];
    let sing = document.createElement('div');
    sing.className = 'sing';
    sing.appendChild(await colorInfo('red', 'Comparing Element'));
    sing.appendChild(await colorInfo('Blue', 'Comparing Element'));
    sing.appendChild(await colorInfo('green', 'Min Element'));
    container.appendChild(sing);


    for (let i = 0; i < n; i++) {
        console.log('HEre');
        let minn = heights[i];
        let ind = i;
        for (j = i + 1; j < n; j++) {
            if (isStopped) {
                colors([], []);
                return;
            }
            if (heights[j] < minn) {
                minn = heights[j];
                ind = j;
            }

            colors([i, j, ind, ...sorted], ["red", "blue", "green", ...sortedCol]);
            console.log(ind);
            if (isStopped) {
                colors([], []);
                return;
            }
            await sleep(delay);
            if (isStopped) {
                colors([], []);
                return;
            }
        }
        swap(i, ind);
        sorted[i] = i;
        sortedCol[i] = 'yellow';
    }
    reset();

}

// selectionSort();

//Insertion Sort
async function insertionSort() {
    sorted = [];
    sortedCol = [];
    let sing = document.createElement('div');
    sing.className = 'sing';
    sing.appendChild(await colorInfo('red', 'Key Element'));
    // sing.appendChild(await colorInfo('Blue' , 'Comparing Element'));
    sing.appendChild(await colorInfo('green', 'Compared ELement'));
    container.appendChild(sing);

    for (i = 1; i < n; i++) {
        if (isStopped) {
            colors([], []);
            return;
        }
        let key = heights[i];
        let j = i - 1;

        while (j >= 0 && heights[j] > key) {
            swap(j + 1, j);
            colors([i, j], ["red", "green"]);
            console.log(j);
            j--;
            if (isStopped) {
                colors([], []);
                return;
            }
            await sleep(delay);
            if (isStopped) {
                colors([], []);
                return;
            }
        }
        if (isStopped) {
            colors([], []);
            return;
        }
        await sleep(delay);
        if (isStopped) {
            colors([], []);
            return;
        }
    }
    reset();

}

// insertionSort();


//Merge Sort

async function mergeSort() {
    if (!r4.checked)
        return;

    sorted = [];
    sortedCol = [];
    let sing = document.createElement('div');
    sing.className = 'sing';
    sing.appendChild(await colorInfo('Yellow', 'Range'));
    // sing.appendChild(await colorInfo('Blue' , 'Comparing Element'));
    sing.appendChild(await colorInfo('green', 'Sorting Position'));
    container.appendChild(sing);

    arr = heights;
    n = arr.length;
    var curr_size;
    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
        for (let l = 0; l < n - 1; l += 2 * curr_size) {
            if (isStopped) {
                colors([], []);
                return;
            }
            var m = Math.min(l + curr_size - 1, n - 1);
            var r = Math.min(l + 2 * curr_size - 1, n - 1);
            var i, j, k;
            var n1 = m - l + 1;
            var n2 = r - m;
            var L = Array(n1).fill(0);
            var R = Array(n2).fill(0);
            base = [];
            col = [];
            ind = 0;
            for (i = 0; i < n1; i++) {
                L[i] = arr[l + i];
            }
            for (j = 0; j < n2; j++) {
                R[j] = arr[m + 1 + j];
            }
            for (i = l; i <= r; i++) {
                base[i - l] = i;
                col[i - l] = 'yellow';
            }
            i = 0;
            j = 0;
            k = l;
            colors(base, col);
            console.log(i, j, n1, n2);

            while (i < n1 && j < n2) {
                if (isStopped) {
                    if (isStopped) {
                        colors([], []);
                        return;
                    }
                    colors([], []);
                    return;
                }
                // console.log("HERE");
                if (L[i] <= R[j]) {
                    if (isStopped) {
                        colors([], []);
                        return;
                    }
                    colors([k, ...base], ['green', ...col]);
                    i++;
                } else {
                    for (let i1 = m + 1 + j; i1 > k; i1--) {
                        swap(i1, i1 - 1);
                    }
                    if (isStopped) {
                        colors([], []);
                        return;
                    }
                    colors([k, ...base], ['green', ...col]);
                    j++;
                }
                if (isStopped) {
                    colors([], []);
                    return;
                }
                await sleep(delay);
                k++;
            }
            if (isStopped) {
                colors([], []);
                return;
            }

            await sleep(delay);
            if (isStopped) {
                colors([], []);
                return;
            }
        }
    }
    reset();
}
// mergeSort();

async function quickSortIterative() {
    if (!r5.checked)
        return;

    arr = heights;
    l = 0;
    h = n - 1;
    console.log("Arr " + arr);
    let stack = new Array(h - l + 1);
    stack.fill(0);
    let top = -1;
    let sing = document.createElement('div');
    sing.className = 'sing';
    sing.appendChild(await colorInfo('green', 'Pivot-Element'));
    sing.appendChild(await colorInfo('Yellow', 'Range of Search'));
    sing.appendChild(await colorInfo('red', 'Comparing Element'));
    sing.appendChild(await colorInfo('blue', 'Comparing Element'));

    container.appendChild(sing);

    stack[++top] = l;
    stack[++top] = h;
    base = []
    col = []
    let i = 0;
    for (i = stack[0]; i <= stack[1]; i++) {
        base[i - stack[0]] = i;
        col[i - stack[0]] = 'yellow';
    }
    i = 1;

    colors(base, col);
    console.log("Top " + top);
    if (isStopped) {
        colors([], []);
        return;
    }
    console.log('1');
    // await sleep(delay + 500);
    if (isStopped) {
        colors([], []);
        return;
    }
    while (top >= 0) {
        if (isStopped) {
            colors([], []);
            return;
        }

        h = stack[top--];
        l = stack[top--];
        for (i = l; i <= h; i++) {
            base[i - l] = i;
            col[i - l] = 'yellow';
        }
        colors(base, col);
        console.log('1');
        if (isStopped) {
            colors([], []);
            return;
        }
        await sleep(delay);
        if (isStopped) {
            colors([], []);
            return;
        }
        console.log("Top " + top);
        i = i - 2;
        let high = h;
        let low = l;
        let pivot = arr[high];
        base = [high];
        col = ["green"];
        if (isStopped) {
            colors([], []);
            return;
        }
        let t = (low - 1);

        base[2] = t;
        col[2] = "blue";
        for (let j = low; j <= high - 1; j++) {

            base[1] = j;
            col[1] = "red";
            colors(base, col);
            if (isStopped) {
                colors([], []);
                return;
            }
            await sleep(delay);
            if (isStopped) {
                colors([], []);
                return;
            }
            if (arr[j] <= pivot) {
                t++;
                base[2] = t;
                swap(t, j);
                colors(base, col);
                if (isStopped) {
                    colors([], []);
                    return;
                }
                await sleep(delay);
                if (isStopped) {
                    colors([], []);
                    return;
                }
            }
        }

        swap(t + 1, high);
        console.log("lat" + t + 1);
        p = 1 + t;
        if (isStopped) {
            colors([], []);
            return;
        }
        console.log(p);
        if (p - 1 > l) {
            console.log(i, top);
            stack[++top] = l;
            stack[++top] = p - 1;
        }
        if (p + 1 < h) {
            stack[++top] = p + 1;
            stack[++top] = h;
        }
        console.log("top " + top);
    }
    reset();
}