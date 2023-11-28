# blastengine node for Node-RED

Send email with blastengine by Node-RED

## Usage

Input settings parameters.

- username  
Username of blastengine account.
- apikey  
API key of blastengine account.
- to  
Email address of recipient.
- subject  
Subject of email.
- message  
Mail body of email.
- fromname  
From name of email.
- fromemail  
From email address of email.

Every parameters are default value. You can replace parameters by payload.

## Message body

You can use keywords in message body.

- __input__  
Input values from previous node. You can use it if previous node return single value.
- __{key}__
Value of key in payload.

### Example

```
We got new values.

__input__

__value__
```

## Response

You can get response from blastengine.

```json
{
	"deliveryId": 99999
}
```

Or error messages from blastengine.

```json
{
	"error_messages": {
		"to": [
			"user@example.com: data is invalid email address."
		]
	}
}
```

## License

MIT
