import "should";
import { delimiter_discover } from "../lib/utils/delimiter_discover.js";

describe("Option `delimiter_auto`", function () {
  it("dominent characters has the most occurences", function () {
    // There is more `.` than `,`
    delimiter_discover([["a.b,c.d"], ["e,f.g.h"]]).should.eql(".");
  });

  it("dominent characters has a smaller deviance", function () {
    // There is more `x` than `.` but `.` has always 2 occurrences
    delimiter_discover([
      ["xa.xb,c.d"],
      ["xe,xf.g.h"],
      ["xe,xf.xg.h"],
    ]).should.eql(".");
  });

  it("dominent characters are boosted if prefered", function () {
    // `,` is more boosted than `.`
    delimiter_discover([["1,a.b,c.d"], ["2,e,f.g.h"]]).should.eql(",");
  });
});
