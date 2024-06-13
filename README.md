# Scrapper Mercadolibre - Documentación

## Pedido 1
Me estoy abriendo mi propio quiosco y necesito ponerle precios a los precios. Me fije como andan los precios en Mercado Libre para darme una idea, pero todos los días cambian. A veces peor, cambian a cada hora. Si entro todos los días a fijarme como cambiaron, pierdo como una hora. Vendo varios productos de distintas categorías, filtrar uno por uno es un lio.
Necesito alguna forma de estar al tanto de los precios todos los días pero sin estar entrando a Mercado Libre manualmente y poniendo los productos uno por uno.

Además, me gustaría saber que productos fueron los que más aumentaron de precio, en porcentaje, durante la semana. Algún reporte de eso me vendría bien.

## ¿Qué es scrappear?
Es una técnica utilizada mediante software para extraer información de los sitios web. Trae datos estructurados ej: JSON.

## ¿Cómo hago un scrapping?
Usualmente se utiliza herramientas y bibliotecas diseñadas para parsear HTML y extraer datos, como Beautiful Soup o Selenium en Python.

## ¿Realmente lo que necesitamos es scrappear mercadolibre?
Nosotros consideramos que no. El cliente quiere saber como van cambiando los precios en mercadolibre para saber que precio ponerle a sus productos. Nosotros sabemos que tenemos que ir a buscar estos datos a un lugar puntual, no es una búsqueda y recopilación de datos desordenados. Sabemos que si necesitamos un dato puntual podemos buscarlo mediante una API y en este caso tenemos la API de Mercadolibre.

## ¿Qué opciones encontramos?
Encontramos dos caminos, efectivamente hacer scrapping con selenium dado la estructura y contenido dinámico de la web de Mercadolibre o usar la API que ofrece mercadolibre. Consideramos que lo mejor sería usar la API.

## ¿Por qué elegimos ir por la API de Mercadolibre?
Creemos que cumple como solución a este problema puntual. Es un entorno más controlado y solo accedemos a los endpoints que necesitamos, no se necesita más.

## ¿Por qué decidimos encarar la optativa 2?
Para evaluar ambas propuestas tuvimos en cuenta, contexto inflacionario, asumptions que tuvimos en ambas consignas y llegamos a la conclusión de seguir con la optativa 2. 
Las razones fueron la flexibilidad, asumir que realmente lo que se necesita es MAPEAR los precios de otros vendedores pero eso no quita que vos tengas ue estar actualizando tus precios por tus proveedores, entonces por que estar limitándose a aumentar solo un 10%, los precios pueden subir un 5%, 6% y si no lo actualizas es plata que pierde el negocio.

## ¿Qué información trae la API?
https://developers.mercadolibre.com/devcenter/

### Pruebas API Mercadolibre
https://developers.mercadolibre.com.ar/es_ar/items-y-busquedas


## Uso de la API de MercadoLibre ##

## Tutorial easy para dejarlo corriendo:

### Necesitamos:
- Cuenta de GitHub (podemos loggear con google).
- Cuenta de Vercel (podemos loggear con google).
- Cuenta de MercadoLibre (no.. no se puede con google acá. O sea si, pero no).
- Cuenta de DevCenter en MercadoLibre.
- Editor de código.
- Tener las bases de Typescript afiladas (?).
- Buena onda y no mandarse macanas para que no les hackeen el MercadoLibre como a mi :D (tranqui igual que yo les voy a contar como NO mandarselas).
- ThunderClient desde VisualStudioCode (yo usé ese, podes usar el que quieras).

### Pasos:

Primero arrancamos creando el repositorio de GitHub. Si ya existe, podés usar la URL del mismo o forkearlo para usarlo como repo en Vercel [y si te copás también podes aprovechar lo que ya setteamos ;D (asi te salteas todo esto). Para más información comunicarse con Martu o Agus!]

Hacemos el 'git clone' desde la consola de nuestro Visual para que nos copie todo lo del repo, y checkeamos el origin para que nos tome el repositorio que deseemos.

`git remote -v` // (sin las barras, obvio) checkea el origin; si te dice que no es un repo de GitHub, fijate que estés en la carpeta que corresponda! 

Configuramos todo con los comandos copados que pasó Diego en las presentaciones de las clases introductorias de Typescript.
#### Te tiro algunos:

`tsc --init` // te crea el tsconfig.json

`npm install --save-dev typescript` // te instala Typescript como dependencia de desarrollo.

Hay muchos más, esto es lo minimo e indispensable, pero te sirve como punto de partida para configurar el repo.
- Creen el *.gitignore*, que lo vamos a usar.

Una vez tenemos bien linkeado la carpeta local (el código que abrimos desde el Visual) con GitHub, podemos proceder a la etapa de configurar el Vercel.

Para configurar el *Vercel* tenés que loggearte en - https://vercel.com/ - usando la cuenta de Google o creando todo desde cero. Como prefieras. Luego te metés en el apartado de * Add new -> Proyect * y donde te pide que importes un repositorio de GitHub vos vas a agregar la cuenta que contiene el repositorio y vas a seleccionarlo de entre todos los que tengas.

Una vez terminas de crear tu nuevo proyecto, haces el deploy y Voalá! Se te va a asignar una URL principal para tu host (la cual siempre es - https://NOMBRE_DEL_REPO.vercel.app -). En nuestro caso, la URL que nos creó es - https://tp2-documentacion.vercel.app/ -.

### Ahora te estarás preguntando: ¿y para qué *m#?@!* necesitamos un *Vercel*?

Es una buena pregunta, pero la respuesta parece joda. Porque MercadoLibre nos obligaba a tener un dominio SEGURO en el apartado de Redirect URI a la hora de crear la app de MeLi (mercadolibre jaja).

### ¿O sea?

Muy fácil! Como nosotros decidimos meternos con la API de MercadoLibre, la empresa te obliga a seguir determinado "protocolo" para garantizar la "seguridad" (a mi me hackearon 2 horas antes de presentar el trabajo jaja) (seguridad!) (igual fue mi culpa, ahora te voy a contar.. para que no te pase a vos!). Como necesitamos seguir su protocolo, lo que vamos a hacer a continuación es fijarnos que nuestro código corra perfectamente en el dominio que nos proporcionó Vercel y pasaremos a la interfaz de MercadoLibre DevCenter.

Paso la URL para que no tengan que buscarla: https://developers.mercadolibre.com.ar/es_ar

Ahora sí, una vez estemos ahí vamos a loggear y hacer todo para "crear una app desde su interfaz" y que podamos linkearla para hacer llamadas a la API. ¿Por qué? porque necesitamos un Access Token que nos brinda MercadoLibre para incrustarla en las interacciones que tengamos con api.mercadolibre y asi certifiquen que somos un usuario -legit-

Para crear la APP de MeLi, vamos ahora, una vez hayamos creado la cuenta o nos hayamos loggeado, a ingresar a la siguiente URL - https://developers.mercadolibre.com.ar/devcenter -

Allí vamos a poder administrar y crear nuestras aplicaciones. Vamos a seleccionar el apartado de "crear nueva aplicación" y a configurar la App; donde nos pide que pongamos una "Redirect URI", vamos a pegar la famosa URL que nos proporcionó Vercel.

Una vez este configurada la App, podemos administrarla desde el /devcenter de - developers.mercadolibre.com.ar -

Por qué necesitamos la App? Para generar el AccessToken! Ahora te cuento a continuación.

## Importantísima esta parte!

Como ya te conté, el Access Token (a partir de ahora lo voy a llamar AT) es necesario para que MeLi sepa que no sos mala gente. Y para poder usar su Api.

## ¿Como conseguimos el AT?
Hay que tirar una magia importante, pero para tu tranquilidad te dejo la documentación acá, en caso de que la quieras leer. Aviso que está bastante desactualizada, por lo que buena suerte si te animas a pasar por ese lío *:)*

https://developers.mercadolibre.com.ar/es_ar/mi-primera-aplicacion
https://developers.mercadolibre.com.ar/es_ar/registra-tu-aplicacion
https://developers.mercadolivre.com.br/es_ar/recomendaciones-de-autorizacion-y-token

Vamos a utilizar el método de obtener el AT desde el "Body".
Para ello vamos a necesitar la siguiente magia:

https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI
https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=5633518982702410&redirect_uri=https://3.138.109.11

En la `*magia*` vamos a reemplazar el parámetro que dice `CLIENT_ID` con el *App ID* en tu App del devcenter de Meli y `REDIRECT_URI` con el *Redirect URI* que pusiste en la App de MeLi cuando la configuraste.

Una vez tengas eso, te va a llevar a una URL que, si te fijas en el campo donde van las URL en el navegador, te va a haber tirado una URL distinta a la que ingresaste. Ahí vamos a obtener el `CODE`. El CODE es todo lo que está desde TG (inclusive) hasta el final. (si hay algún "&", marca el límite del CODE).
TG-665e79ec1673800001272cf4-292963064

Cuando lo tengamos, vamos a ir al *ThunderClient* desde el `VisualStudioCode` y vamos a seleccionar la opción de "`importar`". En la versión actual del Visual/Thunder se encuentra en el desplegable estilo hamburguesa al lado del buscador del ThunderClient. Lo vas a encontrar, vos confiá. A mi me llevó *1 hora*.

Cuando seleccionemos el import `cURL` nos debería abrir el "buscador" del `VisualStudioCode`, invitándonos a que le pasemos algo. *¿Qué le tenemos que pasar? Esto:*

````
curl --location 'https://api.mercadolibre.com/oauth/token' \
--header 'accept: application/json' \
--header 'content-type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'client_id=CLIENT_ID' \
--data-urlencode 'client_secret=CLIENT_SECRET' \
--data-urlencode 'code=CODE' \
--data-urlencode 'redirect_uri=REDIRECT_URI'
````
Cuando demos al enter te va a abrir el cURL que importaste, con los parámetros que le dijiste (o bueno, los que yo te dije que pongas)(en realidad me lo dijo este *señor*, y funcionó: - https://www.youtube.com/watch?v=5TjV6ph01V8 - ) tenés que ir *reemplazando* todos los `valores` que fuiste obteniendo a lo largo del proceso. Los valores que necesitamos son:

- *CODE* (el que sacamos desde el Body).
- *CLIENT_ID* (sería AppID, y se encuentra en el Editar de la App de MercadoLibre).
- *CLIENT_SECRET* (se encuentra en el Editar de la App de MercadoLibre).
- *REDIRECT_URI* (ACÁ SIRVIÓ EL VERCEL!!!. Poné la URL del vercel.app, o la RedirectURI que, en este punto, deberían ser iguales).

Una vez termines, le darás a enviar y te mandará un *jSON* con la data que solicitamos. En este caso, fue el AT.

## ¿Cómo usamos el AT?

### Así:

```` https://api.mercadolibre.com/sites/MLA/search?q=${query}&access_token=${accessToken} ````
Donde figura *query* ingresamos el parámetro de búsqueda y, donde dice *accessToken* ingresamos el accessToken; igual ojo, no termina acá.

#### El AT es *IMPRESCINDIBLE* que lo pongan en el archivo .env (que en tu caso ya deje setteado, así que no va a ser necesario) y que el .env lo agreguen al gitignore. Sino queda expuesta información sensible y podría ser un riesgo para ustedes [la re vivía; igual posta, a mi me hackearon por dejar todo expuesto (creo)].

Y eso es todo! Gracias por acompañarme en esta triste historia que, en mi caso termina (en parte) acá, y en el tuyo recién comienza!

## ! ! ! Si necesitas una mano no dudes en consultarnos :D ! ! ! ##