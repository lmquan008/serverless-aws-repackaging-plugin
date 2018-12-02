
var assert = require('assert');
var pack = require('../lib/pack');
var fs = require('fs')
var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

describe('Should read information from serverless service', function () {
    describe('#extractPackageInfo()', function () {
        it('should return information about packaging', function () {
            var functions = JSON.parse(fs.readFileSync("./test/data/functions.json").toString());
            var package = JSON.parse(fs.readFileSync("./test/data/servicePackage.json").toString());
            var result = pack.extractPackageInfo({
                functions,
                package
            });
            expect(result).contains.keys("package", "functionPackages");
        });
    });
});