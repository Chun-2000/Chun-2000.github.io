function $q(node) {
    let nodelist = document.querySelectorAll(node);
    if (nodelist.length == 0)
        return null;
    return nodelist.length == 1 ? nodelist[0] : nodelist;
}
export {$q};