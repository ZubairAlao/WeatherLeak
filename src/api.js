export async function fetchWeather(lat, long) {
    const APIkey = '245110f1d02c69e3818953300583c800';
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${APIkey}`;
    // api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9ccea15f0c7e6b2c585fedd8ed73ad35
  
    try {
      const response = await fetch(baseUrl);
  
      if (!response.ok) {
        throw {
          message: "Failed to fetch data",
          statusText: response.statusText,
          status: response.status,
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  export async function fetchCity(cityName) {
    const APIkey = '245110f1d02c69e3818953300583c800';
    const baseUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=3&appid=${APIkey}`;
    // http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
  
    try {
      const response = await fetch(baseUrl);
  
      if (!response.ok) {
        throw {
          message: "Failed to fetch data",
          statusText: response.statusText,
          status: response.status,
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  

  export async function fetchForecast(lat, long) {
    const APIkey = '245110f1d02c69e3818953300583c800';
    const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${APIkey}`;
    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  
    try {
      const response = await fetch(baseUrl);
  
      if (!response.ok) {
        throw {
          message: "Failed to fetch data",
          statusText: response.statusText,
          status: response.status,
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  