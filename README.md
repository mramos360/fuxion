# @mramos360/fuxion

## Install
`npm install @mramos360/fuxion`

## Usage

Spec file:

$username
    selector    #username
    above $password 10 to 20 px

$password
    selector    .password
    below $username 10 to 20 px

$login_button
    selector    #login
    below $password 10px
    width 100px
    height 25px

{
    element: "username",
    specs: [
        {
            type: "selector",
            value: "#username"
        },
        {
            type: "position",
            value: "above"
            details: {
                offsetParent: $password,
                top: [10, 20],
                unit: px
            }
        }
    ]
}