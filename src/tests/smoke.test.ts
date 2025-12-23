import { Button, Dialog, TextField } from "@/ui/components";

describe("UI exports", () => {
  it("exports core components", () => {
    expect(Button).toBeDefined();
    expect(Dialog).toBeDefined();
    expect(TextField).toBeDefined();
  });
});
