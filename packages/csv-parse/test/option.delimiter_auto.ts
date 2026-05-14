import should from "should";
import { parse, normalize_options } from "../lib/index.js";

describe("Option `delimiter_auto`", function () {
  it("validation", function () {
    parse("", { delimiter_auto: true }, () => {});
    parse("", { delimiter_auto: false }, () => {});
  });

  it("default to false", function () {
    const options = normalize_options({});
    options.delimiter_auto.should.eql(false);
    options.delimiter.should.eql([Buffer.from(",")]);
  });

  it("set delimiter to empty array when true", function () {
    const options = normalize_options({ delimiter_auto: true });
    options.delimiter_auto.should.eql(true);
    should(options.delimiter).eql(undefined);
  });
});
