$(function() {
  //foo();
  barfoo();
  bar.barfoo();
});

function foo() {
  console.log("hi");
}

var bar = {
  foobar: 1,
  barfoo: function() {
    console.log(ObjectName.property1Name);
  }
};

var property4Value = 4;

var ObjectName = {
  property1Name: "property1Value",
  property2Name: "property2Value",
  property3Name: function() {},
  property4Name: property4Value
};
