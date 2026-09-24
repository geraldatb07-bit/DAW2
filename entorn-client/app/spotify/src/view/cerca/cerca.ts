export function crearInputCerca(): HTMLInputElement {
    const input: HTMLInputElement = document.createElement("input");
    input.id = "cerca";
    input.name = "cerca";
    input.type = "text";
    input.placeholder = "Introdueix cançó a buscar";
    return input;
}

export function crearCerca(): HTMLFormElement {
    const form: HTMLFormElement = document.createElement("form");
    const label: HTMLLabelElement = document.createElement("label");
    const input: HTMLInputElement = crearInputCerca();

    label.htmlFor = "cerca";
    label.textContent = "Cerca:";
    form.appendChild(label);
    form.appendChild(input);

    return form;
}