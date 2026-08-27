// netlify/functions/api-lookup/api-lookup.js

exports.handler = async (event) => {
  // শুধু POST মেথড অনুমোদন
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ status: 'error', message: 'Method Not Allowed' })
    };
  }

  try {
    // ইউজারের পাঠানো ডেটা
    const body = JSON.parse(event.body);
    const number = body.number;

    if (!number) {
      return {
        statusCode: 400,
        body: JSON.stringify({ status: 'error', message: 'Phone number required' })
      };
    }

    // আপনার API-তে কল
    const API_URL = 'https://exploitsindia.site/osint/api.php';
    const API_KEY = 'anish-exploits'; // এখানে আপনার কী বসান

    const params = new URLSearchParams({
      key: API_KEY,
      type: 'number',
      num: number
    });

    const response = await fetch(`${API_URL}?${params}`);
    const data = await response.json();

    // রেসপন্স ফরম্যাট করে ফেরত পাঠান
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // CORS এর জন্য
      },
      body: JSON.stringify({
        status: 'success',
        result: data.result || []
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'error',
        message: error.message || 'Internal Server Error'
      })
    };
  }
};
