import Avatar from "@mui/material/Avatar"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import LockIcon from "@mui/icons-material/Lock"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import { Formik, Form } from "formik"
import { object, string } from "yup"
import useApiRequest from "../services/useApiRequest"
import logo from "../assets/logo.png"

const Login = () => {
  const { login } = useApiRequest(); //* login fonksiyonu oluşturduğumuz custom hooktan destr ettik
  //! Hangi durum olduğunda hangi hata mesajı gelecekse schema'da yazıyoruz. yup ile schema oluşturuyoruz
  const loginSchema = object({
    email: string()
      .email("Enter a valid email")
      .required("Email is required"), //* required içerisine mesaj yazılmazsa otomatik mesaj oluşturur, biz burada mesaj yazdığımız için bizim mesajımız kullanıcıya gösterilecek
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]+/,
        "The password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)."
      ), //? password'de daha fazla zorunluluk olacağı için minimum karakter max karakter özel karakter vs. bunlar regex ile vd. fonksiyonlar ile buraya eklenebilir. regex'ler matches() ile eklenir. Burada ayrı ayrı matches() yaptık, bu şekilde kullanım kullanıcıyı yönlendirmek için iyidir. Validation için backend tarafında oluşturulan regex e  göre kriterler burada oluşturulur. FE ve BE aynı validasyon pateernini içermelidir
  });
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          // height: "100vh",
          p: 4,
        }}
      >
        <Grid item xs={12} mb={3} sx={{alignContent:"center"}}>
        <Typography variant="h5" noWrap component="div" sx={{display:"flex",alignItems:"center", flexGrow: 1,gap:1,justifyContent:"center",borderBottom:"3px solid gray",p:2 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "80px", height: "80px", borderRadius: "50%",backgroundColor:"#e4cbcb" }}
            />
            <span>'s INVENTORY</span>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={4} sx={{border:"2px solid white",p:4,backgroundColor:"#e4cbcb"}}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              //TODO
              //? post, toastify, state güncelleme işlemleri login fonksiyonunda oluşturuldu
              login(values); //! values içerisinde email ve password mevcut
              // !formu resetlemek için
              actions.resetForm();
              actions.setSubmitting(false); //? actions içerisinde isSubmitting prop'u var, submit yapınca bu true olur ve submit butonuna kullanıcı tekrar tekrar basmasın diye submit işlemi bitene kadar butonu disablled yapar.
              //*navigate
            }}
            //? component={} prop'u TextField'leri component haline getirip buraya yazmamızı ve aşağıdaki destr olarak gönderdiklerimizi prop içerisinde kod kalabalığı yapmadan göndermemizi sağlar;ancak şimdi bu kullanımı yapmayacağız
          >
            {(
              {
                values,
                handleChange,
                handleBlur,
                touched,
                errors,
                isSubmitting,
              } //!Burada formik componenti içerisindeki prop'ları destr ile açıp kullanıyoruz. Buradaki fonksiyon ve değişkenleri formikten import etmiş gibi düşünebiliriz
            ) => (
              <Form>
                {/* //?Form formikten import edildi */}
                {/* //!Box,Textfield bunlar mui component'leridir */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values.email} //* email'i yakalamak için
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)} //* email input alanına dokunulduysa ve yup'tan hata mesajı var mı sonucuna göre error true olursa helperText değeri ekrana kırmızı yazılır. touched.email boolean sonuç getiri ancak errors.email string olacağı için boolean yaptık
                    helperText={touched.email && errors.email} //*Girilen bilgilere göre hata mesajlarının değişimini yup ile oluşturacağız. error true ise errors içindeki email mesajını ekrana hata mesajı olarak yaz. Burada touched.email kontrolünü yaptık; çünkü biz daha email alanına dokunmadan hata mesajı almamak için bunu yaptık.
                  />
                  <TextField
                    label="password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password} //* password'ü yakalamak için
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting} //? submit işlemi devam ederken buton disable edilir
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
