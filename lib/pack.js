

const extractPackageInfo = (service) => {
    var package = service.package;
    var funcNames = Object.keys(service.functions);
    var functionPackages = funcNames.filter(f => {
        return Object.keys(service.functions[f]).filter(k => k === 'package').length == 1
    }).map(f => service.functions[f].package);
    return {
        functionPackages,
        package
    }
}

module.exports = {
    extractPackageInfo
}

